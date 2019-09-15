pipeline {
  agent any

   stages {
    stage('Clean') {
      steps {
        sh './build/clean.sh'
      }
    }

    stage('Build') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml build --no-cache'
      }
    }

    stage('Start') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml up -d --force-recreate'
      }
    }
  }
}
