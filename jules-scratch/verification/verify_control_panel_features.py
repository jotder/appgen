from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the login page
    page.goto("http://localhost:4202/login")

    # Login as admin
    page.get_by_role("button", name="Login as Admin").click()
    expect(page.get_by_text("Role: admin")).to_be_visible()

    # Navigate to control panel
    page.get_by_role("link", name="Control Panel").click()
    expect(page.get_by_role("heading", name="Control Panel")).to_be_visible()

    # Verify app config form
    expect(page.get_by_label("Landing Page:")).to_be_visible()
    expect(page.get_by_label("Show Menu:")).to_be_visible()

    # Verify page editors
    expect(page.get_by_role("heading", name="Page Configurations")).to_be_visible()
    expect(page.get_by_role("heading", name="Dashboard (dashboard.json)")).to_be_visible()

    # Open the page creation wizard
    page.get_by_role("button", name="Create New Page").click()
    expect(page.get_by_role("heading", name="Page Creation Wizard")).to_be_visible()

    # Create a new page
    page.get_by_label("Page ID:").fill("new-page")
    page.get_by_label("Page Title:").fill("New Page")
    page.get_by_role("button", name="Create Page").click()

    # Verify the new page is added
    expect(page.get_by_role("heading", name="New Page (new-page.json)")).to_be_visible()
    expect(page.get_by_role("link", name="New Page")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/control-panel-with-new-page.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
