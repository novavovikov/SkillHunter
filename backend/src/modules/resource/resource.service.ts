import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JSDOM, VirtualConsole } from 'jsdom'
import { map } from 'rxjs/operators'
import { FindOneOptions, Repository } from 'typeorm'
import { Favicon } from '../../utils/favicon'
import { User } from '../user/user.entity'
import { Resource } from './resource.entity'

@Injectable()
export class ResourceService {
  constructor (
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private readonly http: HttpService,
  ) {}

  async findById (id: number | string, options?: FindOneOptions<Resource>) {
    return await this.resourceRepository.findOne({
      where: {
        id: Number(id),
      },
      ...options,
    })
  }

  findByLink (link: string) {
    return this.resourceRepository.findOne({ link })
  }

  async getFromLink (link: string) {
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
          const title: HTMLTitleElement = document.querySelector('title')

          return {
            link,
            icon,
            title: title && title.text,
          }
        }).
        catch(err => {
          return null
        })
    } catch (err) {
      return null
    }
  }

  async findAll (options?: FindOneOptions<Resource>) {
    return this.resourceRepository.find({
      order: {
        id: 'ASC',
      },
      ...options,
    })
  }

  async create (data) {
    const resource = this.resourceRepository.create(data)
    await this.resourceRepository.save(resource)
    return resource
  }

  async setResourceLike (resourceId: number, user: User) {
    const resource: Resource = await this.findById(resourceId, {
      relations: ['usersLikes'],
    })

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    if (resource.usersLikes.find(({ id }) => id === user.id)) {
      return {
        id: resourceId,
        isLiked: true,
        likes: resource.usersLikes.length,
      }
    }

    resource.usersLikes = [...resource.usersLikes, user]

    this.resourceRepository.save(resource)

    return {
      id: resourceId,
      isLiked: true,
      likes: resource.usersLikes.length,
    }
  }

  async removeResourceLike (resourceId: number, user: User) {
    const resource: Resource = await this.findById(resourceId, {
      relations: ['usersLikes'],
    })

    if (!resource) {
      return new HttpException('Resource not found', HttpStatus.BAD_REQUEST)
    }

    resource.usersLikes = resource.usersLikes.filter(({ id }) => id !== user.id)

    this.resourceRepository.save(resource)

    return {
      id: resourceId,
      isLiked: false,
      likes: resource.usersLikes.length,
    }
  }
}
