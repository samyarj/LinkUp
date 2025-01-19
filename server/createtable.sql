CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,       -- Assuming 'id' is a unique identifier
    username VARCHAR(255) NOT NULL,   -- Username should not be null
    email VARCHAR(255) NOT NULL UNIQUE,      -- Email should not be null
    position VARCHAR(255),            -- Position as a string
    avatar VARCHAR(255),              -- Avatar as a string
    isPublic TINYINT(1) DEFAULT 0,    -- Boolean represented as 1/0
    description TEXT,                 -- Description allows longer text
    pronouns ENUM('He/Him', 'She/Her', 'They/Them', 'Other'),            -- Pronouns as a string
    age INT                           -- Age as an integer
);

CREATE TABLE IF NOT EXISTS location (
    id VARCHAR(255) PRIMARY KEY,             -- Unique identifier for the address
    latitude DOUBLE NOT NULL,                -- Latitude for location
    longitude DOUBLE NOT NULL,               -- Longitude for location
    place VARCHAR(255) NOT NULL              -- Name or description of the place
);

CREATE TABLE IF NOT EXISTS userToUser (
    senderId VARCHAR(255) NOT NULL,          -- ID of the sender (foreign key)
    receiverId VARCHAR(255) NOT NULL,        -- ID of the receiver (foreign key)
    status ENUM('Pending', 'Accepted', 'Rejected') NOT NULL, -- Enum for request status
    date DATETIME NOT NULL,                  -- Date of the request
    PRIMARY KEY (senderId,receiverId),
    FOREIGN KEY (senderId) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES user(id) ON DELETE CASCADE
);

-- Table for Message
CREATE TABLE IF NOT EXISTS comment (
    id VARCHAR(255) PRIMARY KEY,             -- Unique identifier for the message
    content TEXT NOT NULL,                   -- Content of the message
    userId VARCHAR(255) NOT NULL,            -- ID of the user (foreign key)
    date DATETIME NOT NULL,                  -- Date of the message
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- Table for Note
CREATE TABLE IF NOT EXISTS note (
    id VARCHAR(255) PRIMARY KEY,             -- Unique identifier for the note
    description TEXT NOT NULL,               -- Description of the note
    title VARCHAR(255) NOT NULL,             -- Title of the note
    date DATETIME NOT NULL,                  -- Creation date of the note
    expirationDate DATETIME NOT NULL,        -- Expiration date of the note
    locationId VARCHAR(255),                 -- ID of the location (foreign key)
    isPublic BOOLEAN NOT NULL,               -- Visibility of the note
    publicationDate DATETIME NOT NULL,       -- Publication date of the note
    userId VARCHAR(255) NOT NULL,            -- ID of the user (foreign key)
    FOREIGN KEY (locationId) REFERENCES location(id) ON DELETE SET NULL,
    FOREIGN KEY (userId) REFERENCES AppUser(auth0Id) ON DELETE CASCADE
);

-- Table for Event (inherits Note)
CREATE TABLE IF NOT EXISTS event (
    id VARCHAR(255) PRIMARY KEY,             -- Unique identifier for the event
    startingHour INT NOT NULL,               -- Starting hour of the event
    endingHour INT NOT NULL,                 -- Ending hour of the event
    FOREIGN KEY (id) REFERENCES Note(id) ON DELETE CASCADE -- Inherits Note
);
