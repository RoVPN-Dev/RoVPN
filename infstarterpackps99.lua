-- Create Screen GUI
local screenGui = Instance.new("ScreenGui")
screenGui.Parent = game.CoreGui

-- Create Button 1
local button1 = Instance.new("TextButton")
button1.Size = UDim2.new(0, 200, 0, 50)
button1.Position = UDim2.new(0.5, -100, 0.4, 0)
button1.Text = "Run Force GUI Script"
button1.Parent = screenGui

-- Create Button 2
local button2 = Instance.new("TextButton")
button2.Size = UDim2.new(0, 200, 0, 50)
button2.Position = UDim2.new(0.5, -100, 0.5, 0)
button2.Text = "Run Force Dev Purchase Script"
button2.Parent = screenGui

-- Button 1 Functionality (forcegui.lua)
button1.MouseButton1Click:Connect(function()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/RoVPN-Dev/RoVPN/refs/heads/main/forcegui.lua"))()
end)

-- Button 2 Functionality (forcedevpurchase.lua)
button2.MouseButton1Click:Connect(function()
    loadstring(game:HttpGet("https://raw.githubusercontent.com/RoVPN-Dev/RoVPN/refs/heads/main/forcedevpurchase.lua"))()
end)
