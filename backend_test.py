import requests
import sys
from datetime import datetime
import json

class WebHelmAPITester:
    def __init__(self, base_url="https://navigate-web-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            try:
                response_json = response.json()
                print(f"Response Body: {json.dumps(response_json, indent=2)}")
            except:
                print(f"Response Text: {response.text}")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")

            return success, response.json() if success and response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "businessName": "Test Business",
            "projectType": "Website Design",
            "budget": "£1000–£2100",
            "message": "This is a test message for the contact form."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )

    def test_contact_submission_invalid_email(self):
        """Test contact form with invalid email"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "businessName": "Test Business",
            "projectType": "Website Design",
            "budget": "£1000–£2100",
            "message": "This is a test message."
        }
        
        return self.run_test(
            "Contact Form - Invalid Email",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=test_data
        )

    def test_contact_submission_missing_fields(self):
        """Test contact form with missing required fields"""
        test_data = {
            "name": "Test User",
            # Missing email, businessName, message
        }
        
        return self.run_test(
            "Contact Form - Missing Fields",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=test_data
        )

    def test_get_contact_submissions(self):
        """Test getting contact submissions (admin endpoint)"""
        return self.run_test(
            "Get Contact Submissions",
            "GET",
            "api/contact/submissions",
            200
        )

def main():
    print("🚀 Starting WebHelm API Tests")
    print("=" * 50)
    
    # Setup
    tester = WebHelmAPITester()

    # Run tests
    print("\n📡 Testing API connectivity...")
    tester.test_api_root()

    print("\n📝 Testing contact form functionality...")
    tester.test_contact_submission()
    tester.test_contact_submission_invalid_email()
    tester.test_contact_submission_missing_fields()

    print("\n📊 Testing admin endpoints...")
    tester.test_get_contact_submissions()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())