pipeline {
    agent any

    environment {
        DOCKER_FILE = "./build/prod/docker-compose.backend.yml"
    }

   stages {
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
