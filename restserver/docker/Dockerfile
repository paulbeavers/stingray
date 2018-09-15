FROM ubuntu
MAINTAINER Paul Beavers

#-------------------------------------------------------------#
# Docker file to create image for the restserver endpoint     #
#-------------------------------------------------------------#

#-------------------------------------------------------------#
# Configure the sshd environment for development purposes     #
#-------------------------------------------------------------#
RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo "root:PbDb0908" | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
EXPOSE 22

#-------------------------------------------------------------#
# SSH login fix. Otherwise user is kicked off after login     #
#-------------------------------------------------------------#
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#-------------------------------------------------------------#
# Copy the rest server product files to the container         #
#-------------------------------------------------------------#
RUN mkdir /opt/stingray

RUN mkdir /opt/stingray/restserver

RUN mkdir /opt/stingray/restserver/app
COPY /Users/pbeavers/stingray/restserver/app/* /opt/stingray/restserver/app

RUN mkdir /opt/stingray/restserver/conf
COPY ../conf/* /opt/stingray/restserver/conf

RUN mkdir /opt/stingray/restserver/examples
COPY ../examples/* /opt/stingray/restserver/examples

RUN mkdir /opt/stingray/restserver/scripts
COPY ../examples/* /opt/stingray/restserver/scripts

RUN mkdir /opt/stingray/setup
COPY ../../setup/* /opt/stingray/setup







#-------------------------------------------------------------#
# install the product pre-requisites                          #
#-------------------------------------------------------------#



CMD ["/usr/sbin/sshd", "-D"]

