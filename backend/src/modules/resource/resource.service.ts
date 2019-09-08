import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JSDOM, VirtualConsole } from 'jsdom'
import { map } from 'rxjs/operators'
import { FindOneOptions, Repository } from 'typeorm'
import { HttpMessageType } from '../../constants/exception'
import { Favicon } from '../../utils/favicon'
import { User } from '../user/user.entity'
import { Resource } from './resource.entity'
import { RESOURCES_BLACK_LIST } from '../../constants/resources'

const extractor = require('unfluff')

@Injectable()
export class ResourceService {
  constructor (
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private readonly http: HttpService,
  ) {}

  async findOne (data: Partial<Resource>, options?: FindOneOptions<Resource>) {
    return await this.resourceRepository.findOne({
      where: data,
      ...options,
    })
  }

  async findById (id: number | string, options?: FindOneOptions<Resource>) {
    return await this.resourceRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  validateResourceLink (link: string) {
    const url = new URL(link)

    for (const domain of RESOURCES_BLACK_LIST) {
      if (url.hostname.includes(domain)) {
        return false
      }
    }

    return true
  }

  update (
    criteria: any,
    data: Partial<Resource>,
  ) {
    return this.resourceRepository.update(criteria, data)
  }

  async getFromLink (
    link: string,
    locale: string = 'en'
  ) {
    try {
      return await this.http.get(link).
        pipe(map(({ data }) => data)).
        toPromise().
        then(async resp => {
          const virtualConsole = new VirtualConsole()
          const dom = new JSDOM(resp, {
            virtualConsole,
          })
          const { document } = dom.window
          const url: URL = new URL(link)
          const FaviconClass = new Favicon(this.http)
          const icon: string = await FaviconClass.getFaviconFromDocument(document, url.origin)
          const titleNode: HTMLTitleElement = document.querySelector('title')

          const data = extractor.lazy(resp, locale)

          return {
            link,
            icon,
            date: data.date(),
            title: titleNode
              ? titleNode.text
              : data.title() || data.softTitle(),
            text: data.description() || data.text(),
            image: data.image()
          }
        }).
        catch(err => {
          return null
        })
    } catch (err) {
      return null
    }
  }

  async getBook (
    author: string,
    title: string
  ) {
    return await this.http.get(encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${author} ${title}`)).
      pipe(map(({ data }) => data)).
      toPromise().
      then((resp: any) => {
        const { selfLink, volumeInfo  }: any = resp.items[0]

        return {
          link: selfLink,
          title: volumeInfo.title,
          author: volumeInfo.authors,
          icon: volumeInfo.imageLinks.thumbnail
        }
      }).
      catch(err => {
        return null
      })
  }

  async findAll (options?: FindOneOptions<Resource>) {
    return this.resourceRepository.find({
      order: {
        id: 'DESC',
      },
      ...options,
    })
  }

  async create (data) {
    const resource = this.resourceRepository.create(data)
    await this.resourceRepository.save(resource)
    return resource
  }

  async createByLink (link: string) {
    const foundResource: Resource = await this.findOne({ link })
    if (foundResource) {
      return foundResource
    }

    const receivedResource = await this.getFromLink(link)
    if (!receivedResource) {
      return null
    }

    return this.create(receivedResource)
  }

  async setResourceLike (resourceId: number, user: User) {
    const resource: Resource = await this.findById(resourceId, {
      relations: ['usersLikes'],
    })

    if (!resource) {
      throw new HttpException({
        message: 'The resource is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST)
    }

    if (resource.usersLikes.find(({ id }) => id === user.id)) {
      return {
        id: resourceId,
        isLiked: true,
        likes: resource.usersLikes.length,
      }
    }

    resource.usersLikes = [...resource.usersLikes, user]

    await this.resourceRepository.save(resource)

    return {
      id: resourceId,
      isLiked: true,
      likes: resource.usersLikes.length,
    }
  }

  async removeResourceLike (
    resourceId: number,
    user: User
  ) {
    const resource: Resource = await this.findById(resourceId, {
      relations: ['usersLikes'],
    })

    if (!resource) {
      throw new HttpException({
        message: 'The resource is not found',
        type: HttpMessageType.error,
        statusCode: HttpStatus.NOT_FOUND
      }, HttpStatus.NOT_FOUND)
    }

    resource.usersLikes = resource.usersLikes.filter(({ id }) => id !== user.id)

    await this.resourceRepository.save(resource)

    return {
      id: resourceId,
      isLiked: false,
      likes: resource.usersLikes.length,
    }
  }

  remove (resource: Resource) {
    return this.resourceRepository.remove(resource)
  }
}
