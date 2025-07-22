pipeline {
  agent any

  environment {
    DOCKER_HUB = 'divyeshh07'
    BACKEND_IMAGE = "${DOCKER_HUB}/restaurant-backend:latest"
    FRONTEND_IMAGE = "${DOCKER_HUB}/restaurant-frontend:latest"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
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

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-credentials',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          script {
            sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            sh "docker push ${BACKEND_IMAGE}"
            sh "docker push ${FRONTEND_IMAGE}"
          }
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          sh "docker run -d --name restaurant-backend -p 7000:7000 ${BACKEND_IMAGE}"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          sh "docker run -d --name restaurant-frontend -p 2000:80 ${FRONTEND_IMAGE}"
        }
      }
    }
  }
}
