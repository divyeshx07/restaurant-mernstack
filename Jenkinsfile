pipeline {
  agent any

  environment {
    DOCKER_HUB = 'divyeshh07'
    BACKEND_IMAGE = "${divyeshh07}/restaurant-backend:01"
    FRONTEND_IMAGE = "$divyeshh07}/restaurant-frontend:01"
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
          docker.build("${divyeshh07/restaurant-backend:01}", './backend')
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        script {
          docker.build("${divyeshh07/restaurant-frontend:01}", './frontend')
        }
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-credentials',
          usernameVariable: 'divyeshh07',
          passwordVariable: 'Divyesh@07'
        )]) {
          script {
            sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            sh "docker push ${divyeshh07/restaurant-backend:01}"
            sh "docker push ${divyeshh07/restaurant-frontend:01}"
          }
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          sh "docker run -d --name restaurant-backend -p 7000:7000 ${divyeshh07/restaurant-backend:01}"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          sh "docker run -d --name restaurant-frontend -p 2000:80 ${divyeshh07/restaurant-frontend:01}"
        }
      }
    }
  }
}
