package quiz.app;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String secretKey;

    private String getJwtFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("Cookie Name: " + cookie.getName() + ", Cookie Value: " + cookie.getValue());
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        System.out.println("No JWT cookie found");
        return null;
    }
    
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);
    
        if (jwt != null && validateToken(jwt)) {
            String username = getUsernameFromJWT(jwt);
    
            // Logovací výpisy
            System.out.println("JWT Token: " + jwt);
            System.out.println("Authenticated user: " + username);
    
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            System.out.println(jwt);
            System.out.println("JWT Token is invalid or missing");
        }
    
        filterChain.doFilter(request, response);
    }

    private boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false;
        }
    }

    private String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject();
    }
}
