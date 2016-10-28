#include <stdio.h>
#include <unistd.h>
#include <RF24/RF24.h>

using namespace std;

// CE Pin, CSN Pin, SPI Speed

// Setup for GPIO 22 CE and CE1 CSN with SPI Speed @ 1Mhz
//RF24 radio(RPI_V2_GPIO_P1_22, RPI_V2_GPIO_P1_26, BCM2835_SPI_SPEED_1MHZ);

// Setup for GPIO 22 CE and CE0 CSN with SPI Speed @ 4Mhz
//RF24 radio(RPI_V2_GPIO_P1_15, BCM2835_SPI_CS0, BCM2835_SPI_SPEED_4MHZ);

// Setup for GPIO 22 CE and CE0 CSN with SPI Speed @ 8Mhz
RF24 radio(RPI_V2_GPIO_P1_15, RPI_V2_GPIO_P1_24, BCM2835_SPI_SPEED_8MHZ);


// Radio pipe addresses for the 2 nodes to communicate.
//const uint8_t pipes[][6] = {"1Node","2Node"};
//const uint64_t pipes[2] = { 0xABCDABCD71LL, 0x544d52687CLL };
const uint64_t piper = 0xADADADADE1LL;

int main() {
    printf("apapapa");
    fflush(stdout);
    sleep(3);
    printf("minimajs");
    fflush(stdout);

	radio.begin();
	radio.enableDynamicPayloads();
	radio.setAutoAck(1);
	radio.setRetries(15,15);
	radio.setDataRate(RF24_250KBPS);
	radio.setPALevel(RF24_PA_MAX);
	radio.setChannel(76);
	radio.setCRCLength(RF24_CRC_8);

	radio.openReadingPipe(1,piper);
    radio.startListening();

	radio.printDetails();

	char receivePayload[10];
    while(1){

		if ( radio.available() )
			{
				radio.read(receivePayload, sizeof(receivePayload));
				printf("Recv: payload=%s\n", receivePayload);
				delay(925); //Delay after payload responded to, minimize RPi CPU time
			}
    }
    return 0;
}
