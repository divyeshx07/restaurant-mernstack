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
        git branch: 'main', url: 'https://github.com/divyeshx07/restaurant-mernstack.git'
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
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            sh "docker push ${BACKEND_IMAGE}"
            sh "docker push ${FRONTEND_IMAGE}"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          sh "kubectl apply -f mongo-deployment.yaml"
          sh "kubectl apply -f backend-deployment.yaml"
          sh "kubectl apply -f frontend-deployment.yaml"
        }
      }
    }

  } // <- closes stages
} // <- closes pipeline
