package org.toasthub.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.jacobpeterson.alpaca.AlpacaAPI;
import net.jacobpeterson.alpaca.model.properties.DataAPIType;
import net.jacobpeterson.alpaca.model.properties.EndpointAPIType;

@Configuration
public class ExternalAPIConfig {

	@Bean
	public AlpacaAPI alpacaAPI() {
        return new AlpacaAPI("PKMIVZGGEV8D04V6RQX5", "pvZvlAx0hSuitl1kNKeKzM5kLdvyK7YnqvN6OFGc", EndpointAPIType.PAPER, DataAPIType.IEX);
    }
}
