package th.ac.tu.cs.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class WelcomeController {
    // Allow CORS for the Node.js app
    @CrossOrigin(origins = {"http://localhost:3000", "http://node-server:3000"})
    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name,
                           @RequestParam(value = "lastName", defaultValue = "World") String lastname) {
        return String.format("Hello %s %s!", name,lastname);
    }
}