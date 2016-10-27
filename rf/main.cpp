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
const uint8_t pipes[][6] = {"1Node","2Node"};
//const uint64_t pipes[2] = { 0xABCDABCD71LL, 0x544d52687CLL };

int main() {
    printf("apapapa");
    fflush(stdout);
    sleep(3);
    printf("minimajs");

    radio.openWritingPipe(pipes[1]);
    radio.openReadingPipe(1,pipes[0]);
    radio.startListening();

if ( radio.available() )
			{
				// Dump the payloads until we've gotten everything
				unsigned long got_time;


				// Fetch the payload, and see if this was the last one.
				radio.read( &got_time, sizeof(unsigned long) );

				radio.stopListening();

				radio.write( &got_time, sizeof(unsigned long) );

				// Now, resume listening so we catch the next packets.
				radio.startListening();

				// Spew it
				printf("Got payload(%d) %lu...\n",sizeof(unsigned long), got_time);

				delay(925); //Delay after payload responded to, minimize RPi CPU time

    return 0;
}
