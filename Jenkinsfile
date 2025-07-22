pipeline {
  agent any

  environment {
    DOCKER_HUB = 'divyeshh07'
    BACKEND_IMAGE = "${DOCKER_HUB}/restaurant-backend:01"
    FRONTEND_IMAGE = "${DOCKER_HUB}/restaurant-frontend:01"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/divyeshx07/restaurant-mernstack.git'
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        script {
          docker.build("${BACKEND_IMAGE}", './backend')
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        script {
          docker.build("${FRONTEND_IMAGE}", './frontend')
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          bat "docker run -d -p 7000:7000 ${BACKEND_IMAGE}"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          bat "docker run -d -p 2000:80 ${FRONTEND_IMAGE}"
        }
      }
    }
  }
}
