import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'dotenv/config'
import { AppModule } from './modules/app/app.module'

const API_BASE_PATH = 'api'
const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(API_BASE_PATH)

  if (env === 'dev') {
    const options = new DocumentBuilder().setTitle('SkillHunter Application').
      setDescription('APIs for the SkillHunter application.').
      setVersion('1.0.0').
      setBasePath(API_BASE_PATH).
      setExternalDoc('For more information', 'http://swagger.io').
      addBearerAuth('Authorization', 'header', 'apiKey').
      build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(port)
  Logger.log(`Server running on http://backend:${port}`)
}

bootstrap()
