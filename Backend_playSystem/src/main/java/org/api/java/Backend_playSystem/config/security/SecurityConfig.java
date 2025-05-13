package org.api.java.Backend_playSystem.config.security;

import org.api.java.Backend_playSystem.jwt.JwtAuthenticationFilter;
import org.api.java.Backend_playSystem.jwt.JwtEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) // Para usar @PreAuthorize
public class SecurityConfig {

  @Bean
  protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS configurado
        .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF (JWT no lo necesita)
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Sin estado
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/login").permitAll() // Login público
            .requestMatchers("/api/users/register").hasAuthority("ROLE_ADMINISTRATOR")
            .requestMatchers("/api/users/userList").hasAuthority("ROLE_ADMINISTRATOR")
            .requestMatchers("/api/clientes/**").hasAuthority("ROLE_ADMINISTRATOR")
            .requestMatchers("/api/dependencias/**").hasAuthority("ROLE_ADMINISTRATOR")
            .requestMatchers("/api/enums/**").hasAuthority("ROLE_ADMINISTRATOR")
            .requestMatchers("/api/proyectos/**").hasAuthority("ROLE_ADMINISTRATOR")
            .anyRequest().authenticated())
        .exceptionHandling(exc -> exc.authenticationEntryPoint(jwtEntryPoint()))
        .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public JwtAuthenticationFilter jwtTokenFilter() {
    return new JwtAuthenticationFilter();
  }

  @Bean
  public JwtEntryPoint jwtEntryPoint() {
    return new JwtEntryPoint();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}