from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    try:
        page.goto("http://localhost:4200")

        # Check for the main dashboard title
        expect(page.locator("h1")).to_have_text("Main Page")

        # Check for the widgets
        expect(page.locator("h3")).to_have_text("Users")
        expect(page.locator("p")).to_contain_text("Welcome to Superset-lite demo!")

    finally:
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
