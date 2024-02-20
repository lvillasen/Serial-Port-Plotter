# Serial Port Plotter
This app plots and prints the data read by the serial port.   It can be useful to debug the acquisition software in projects where an Arduino, ESP32, or any other microcontroller, feeds data into a computer by the serial port. 

The data columns are separated by one space. The included file ESP32-Sine.ino can be downloaded into an Arduino or ESP32 microcontroller with Arduino IDE to generate two sine waves of frequency 1.0 and 2.0 Hz with a sampling rate of 500 Hz. The image Screenshot.png shows the plot produced by this app.

## Usage

- Clone the repository
- Connect a serial port cable between the computer and a source device.
- Open the file index.html with any web browser that support the Web Serial API.

## Live Demo

https://ciiec.buap.mx/Serial-Port-Plotter/

## Credits

- We use the Serial Web API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API).

## License

[MIT](LICENSE)
