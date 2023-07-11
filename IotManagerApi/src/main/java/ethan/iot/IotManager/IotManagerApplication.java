package ethan.iot.IotManager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class IotManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(IotManagerApplication.class, args);
	}

}
