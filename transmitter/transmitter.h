#ifndef __TRANSMITTER_H__
#define __TRANSMITTER_H__

typedef struct {
    uint16_t temp;  //Divide this by 100
    uint16_t power; //Divide this by 100
    uint16_t blinkCount;

} PowerTempValue;

typedef struct {
    uint8_t     sensorId;     // 0 .. 255
    uint16_t    packageCount; // 0 .. 65'535
    union {
        PowerTempValue powerTemp;
    } sensorValue; 
} SensorPayload;

#endif //__TRANSMITTER_H__
