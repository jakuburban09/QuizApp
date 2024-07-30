package quiz.app.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import quiz.app.dto.UserDTO;
import quiz.app.services.UserService;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO user) {
        if (userService.findUserByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        userService.registerUser(user.getUsername(), user.getPassword(), "ROLE_USER");
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/api/login")
public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> credentials, HttpServletRequest request, HttpServletResponse response) {
    try {
        String username = credentials.get("username");
        String password = credentials.get("password");

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = Jwts.builder()
    .setSubject(username)
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
    .signWith(SignatureAlgorithm.HS256, "your_secret_key")
    .compact();

        System.out.println("Generated JWT: " + jwt);

        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true); // Nastavte na true pro větší bezpečnost
        cookie.setSecure(false); // Pouze přes HTTPS, pro testování můžete nastavit na false
        cookie.setPath("/");
        cookie.setMaxAge(86400); // 1 den

        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("token", jwt));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }
}


@GetMapping("/api/check-auth")
public ResponseEntity<Void> checkAuth() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated()) {
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
}
