INSERT INTO Users (FirstName, LastName, Username, UserPassword, Email) 
VALUES 
('Isaac', 'Price', 'IsaacPrice', 'password', 'iprice25250@gmail.com'),
('John', 'Doe', 'JohnDoe123', 'password', 'JohnDoe@gmail.com');

INSERT INTO Teams (TeamName, TeamCaptainID) 
VALUES 
('Team 1', 1);

INSERT INTO UserTeamRoles (UserID, TeamID, Role) 
VALUES 
(1, 1, 'Team Captain'),
(2, 1, 'Team Member');

INSERT INTO Habits (HabitName, IsTeamHabit) 
VALUES 
('Steps', 0),
('Calories', 0),
('Sleep', 1);

INSERT INTO Goals (HabitID, TeamID, UserID, TargetValue, Frequency, StartDate, EndDate) 
VALUES 
(1, 1, 1, 10000, 'Daily', '2024-01-01', '2024-01-31'),
(2, 1, 2, 2000, 'Daily', '2024-01-01', '2024-01-31');

INSERT INTO Progress (GoalID, UserID, ProgressValue, DateLogged) 
VALUES 
(1, 1, 5000, '2024-01-01'),
(2, 2, 1000, '2024-01-01');

INSERT INTO Notifications (UserID, Message) 
VALUES 
(1, 'Welcome to the team!'),
(2, 'Welcome to the team!');

INSERT INTO Badges (BadgeName, Description, ImageUrl) 
VALUES 
('Stepper', 'Earned for reaching 10000 steps', 'https://example.com/badge1.png');

INSERT INTO UserBadges (UserID, BadgeID) 
VALUES 
(1, 1),
(2, 1);

INSERT INTO Administrators (UserID) 
VALUES 
(1);

