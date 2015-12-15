import RPi.GPIO as GPIO, time, os
from sys import stdout

DEBUG = 1

GPIO.setmode(GPIO.BCM)

def RCtime (RCpin):
    reading = 0
    GPIO.setup(RCpin, GPIO.OUT)
    GPIO.output(RCpin, GPIO.LOW)
    time.sleep(0.1)

    GPIO.setup(RCpin, GPIO.IN)

    while (GPIO.input(RCpin) == GPIO.LOW):
        reading += 1

    return reading

def getReading ():
    while True:
        return RCtime(18)
