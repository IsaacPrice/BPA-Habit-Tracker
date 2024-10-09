CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLoginAt DATETIME
);


CREATE TABLE Teams (
    TeamID INT PRIMARY KEY IDENTITY,
    TeamName NVARCHAR(100) UNIQUE NOT NULL,
    TeamCaptainID INT FOREIGN KEY REFERENCES Users(UserID),
    CreatedAt DATETIME DEFAULT GETDATE()
);


CREATE TABLE UserTeamRoles (
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    TeamID INT FOREIGN KEY REFERENCES Teams(TeamID),
    Role NVARCHAR(20) NOT NULL, 
    PRIMARY KEY (UserID, TeamID)
);


CREATE TABLE Habits (
    HabitID INT PRIMARY KEY IDENTITY,
    HabitName NVARCHAR(100) NOT NULL,
    IsTeamHabit BIT NOT NULL DEFAULT 0
);


CREATE TABLE Goals (
    GoalID INT PRIMARY KEY IDENTITY,
    HabitID INT FOREIGN KEY REFERENCES Habits(HabitID),
    TeamID INT FOREIGN KEY REFERENCES Teams(TeamID) NULL,
    UserID INT FOREIGN KEY REFERENCES Users(UserID) NULL,
    TargetValue DECIMAL(10, 2) NOT NULL,
    Frequency NVARCHAR(10) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);


CREATE TABLE Progress (
    ProgressID INT PRIMARY KEY IDENTITY,
    GoalID INT FOREIGN KEY REFERENCES Goals(GoalID),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    ProgressValue DECIMAL(10, 2) NOT NULL,
    DateLogged DATE NOT NULL
);


CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY IDENTITY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Message NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsRead BIT DEFAULT 0
);


CREATE TABLE Badges (
    BadgeID INT PRIMARY KEY IDENTITY,
    BadgeName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    ImageUrl NVARCHAR(255)
);


CREATE TABLE UserBadges (
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    BadgeID INT FOREIGN KEY REFERENCES Badges(BadgeID),
    EarnedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (UserID, BadgeID)
);


CREATE TABLE Administrators (
    AdminID INT PRIMARY KEY IDENTITY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID)
);

