from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the login page
    page.goto("http://localhost:4200/login")

    # Login as admin
    page.get_by_role("button", name="Login as Admin").click()
    page.wait_for_selector("text=Role: admin")
    page.wait_for_selector("text=Control Panel")
    page.wait_for_selector("text=Settings")


    # Navigate to control panel
    page.get_by_role("link", name="Control Panel").click()
    page.wait_for_selector("text=Control Panel")
    page.screenshot(path="jules-scratch/verification/admin-control-panel.png")

    # Logout
    page.get_by_role("button", name="Logout").click()
    page.wait_for_selector("text=Login")

    # Login as user
    page.get_by_role("button", name="Login as User").click()
    page.wait_for_selector("text=Role: user")

    # Navigate to dashboard
    page.get_by_role("link", name="Dashboard").click()
    page.wait_for_selector("text=Dashboard")

    # Take screenshot of user dashboard
    page.screenshot(path="jules-scratch/verification/user-dashboard.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
