package cl.rednorte.ms_usuarios.event.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {
    // TODO: Configure KafkaTemplate or RabbitTemplate
    // Example for Kafka:
    /*
    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }
    */
}
