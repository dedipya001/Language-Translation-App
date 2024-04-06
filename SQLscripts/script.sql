USE language_translation;

CREATE TABLE language_ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    input_language VARCHAR(255) NOT NULL,
    output_language VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL
);
