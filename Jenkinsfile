pipeline {
    agent any
    stages {
         stage('Copy-Files') {
            steps {
                echo 'Copy Files..'
                configFileProvider([configFile(fileId: 'a22448e3-42b8-4108-b2f3-a0f100f18484', targetLocation: "${env.WORKSPACE}/")]) {}
            }
        }   
        stage('Stop') {
            steps {
                 script {
                    try {
                        echo 'Stop Services..'
                        sh 'docker-compose down'
                    }
                    catch(ex) {
                        echo 'No hay Imagenes de Docker Corriendo'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building Services..'
                sh 'docker-compose up --build -d'
            }
        }
        stage('Unit-Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
            }
        }
    }
}
