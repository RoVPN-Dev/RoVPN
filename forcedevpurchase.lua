
local MarketplaceService = game:GetService("MarketplaceService")
local player = game.Players.LocalPlayer

local developerProductId = 1648407160

-- Create the ScreenGui and Button
local screenGui = Instance.new("ScreenGui", player:WaitForChild("PlayerGui"))
local purchaseButton = Instance.new("TextButton", screenGui)

-- Set properties for the button
purchaseButton.Size = UDim2.new(0, 200, 0, 50)
purchaseButton.Position = UDim2.new(0.5, -100, 0.5, -25)
purchaseButton.Text = "Purchase Item"
purchaseButton.BackgroundColor3 = Color3.new(0, 0.5, 1)
purchaseButton.TextColor3 = Color3.new(1, 1, 1)

-- Function to prompt the purchase
local function promptPurchase()
    local success, errorMessage = pcall(function()
        MarketplaceService:PromptProductPurchase(player, developerProductId)
    end)
    
    if not success then
        warn("Error prompting purchase: " .. errorMessage)
    end
end

-- Connect the button click to the promptPurchase function
purchaseButton.MouseButton1Click:Connect(promptPurchase)
