pipeline {
    agent any

    environment {
        DOCKER_FILE = "./deployment/prod/docker-compose.backend.yml"
    }

    stage('Build') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} build --no-cache'
      }
    }

    stage('Start') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} up -d --force-recreate'
      }
    }
  }
}
