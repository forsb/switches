# switches
nodejs and tellstick server for controlling switches from browser

Library for nRF24L01 taken from https://github.com/stanleyseow/RF24

##Pinouts
| nRF24L01 | RPi Physical | Arduino      |  
|----------|--------------|--------------|  
| VCC      | 17           |     3V3 (NOT 5V!)     |  
| GND      | 20           |     GND      |  
| CE       | 18           |     9        |  
| CSN      | 24           |     4        |  
| SCK      | 23           |     13       |  
| MOSI     | 19           |     11       |  
| MISO     | 21           |     12       | 

###Raspberry Pi
- Clone the git repo and run *make*
- Run the *index.js* with Node.js (something like *nodejs index.js*)

###Arduino
To use the Arduino sketch, the RF24-library has to be installed. To do so, follow these steps:
- Make sure to have the latest Arduino IDE installed
- Go to *Sketch* -> *Include Library* -> *Manage Libraries*
- Search for *RF24*
- Click on ***RF24*** *by* ***TMRh20***
- Choose latest version and click *install*
