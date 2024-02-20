
#define PI 3.14159265
unsigned long target = 0L ;
int n_data = -1;
unsigned long actual;
unsigned long previo = 0L;
float f1 = 1.0;
float f2 = 2.0;
const unsigned long periodoMuestreoMicros = 2000;  // 2 miliseconds 

void setup(){
  Serial.begin(230400); //begin serial communications
  while(true){
  actual = micros();
if (actual - previo >= periodoMuestreoMicros ){
n_data ++;
if (n_data >= 10000){ n_data = 0;}
  String result = String(1000 + round(1000*sin(2*PI*f1*n_data*0.002))) +  " " + String(2000 + round(1000*sin(2*PI*f2*n_data*0.002)))+ " " + String(actual-previo)+ " "+ String(n_data);

  Serial.println(result);
previo = actual; 
  }
  }
}

void loop(){}



    
