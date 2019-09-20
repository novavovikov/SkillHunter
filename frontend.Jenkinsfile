pipeline {
  agent any

  environment {
    DOCKER_FILE = "./deployment/prod/docker-compose.frontend.yml"
  }

   stages {
    stage('Build') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} build --no-cache'
      }
    }

    stage('Landing') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} run landing sh -c "npm run build && npm run export"'
      }
    }

    stage('Web app') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} run web_app sh -c "npm run build"'
      }
    }

    stage('Admin panel') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} run admin_panel sh -c "npm run build"'
      }
    }

    stage('Start') {
      steps {
        sh 'docker-compose -f ${DOCKER_FILE} up -d --force-recreate'
      }
    }
  }
}
