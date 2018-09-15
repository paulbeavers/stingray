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
EXPOSE 2999

#-------------------------------------------------------------#
# SSH login fix. Otherwise user is kicked off after login     #
#-------------------------------------------------------------#
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#-------------------------------------------------------------#
# Copy the rest server product files to the container         #
#-------------------------------------------------------------#
RUN apt-get -y install git
RUN apt-get -y  install vim
RUN git clone https://github.com/paulbeavers/stingray.git /opt/stingray
RUN /opt/stingray/setup/dockersetup.bash

#-------------------------------------------------------------#
# install the product pre-requisites                          #
#-------------------------------------------------------------#

CMD /opt/stingray/restserver/scripts/dockerstart.bash
