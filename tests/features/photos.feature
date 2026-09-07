Feature: Blog post photos

  Scenario: Validate photos across all blog posts
    Given I retrieve all blog posts from the sitemap
    When I check the photos on every blog post
    Then all blog post photos should load correctly