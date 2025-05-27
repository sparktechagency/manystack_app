import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text>
          Privacy Policy{"\n\n"}
          Last updated: May 27, 2025{"\n\n"}
          Welcome to our application. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.{"\n\n"}

          1. Information We Collect{"\n"}
          - Personal Data: When you register or use certain features, we may collect personal information such as your name, email address, phone number, and profile image.{"\n"}
          - Usage Data: We may collect information about how you interact with the app, such as pages viewed, time spent, and features used.{"\n"}
          - Device Data: We may collect information about the device you use to access the app, including IP address, operating system, browser type, and device identifiers.{"\n\n"}

          2. How We Use Your Information{"\n"}
          - To provide and improve our services.{"\n"}
          - To personalize your experience within the app.{"\n"}
          - To communicate with you about updates, features, and promotions.{"\n"}
          - To ensure security and prevent fraud.{"\n"}
          - To comply with legal obligations.{"\n\n"}

          3. Sharing Your Information{"\n"}
          We do not sell, trade, or rent your personal information to others. However, we may share your information in the following circumstances:{"\n"}
          - With trusted service providers who help us operate and maintain the app.{"\n"}
          - When required by law or legal process.{"\n"}
          - To protect our rights, privacy, safety, or property, or that of our users or others.{"\n\n"}

          4. Data Security{"\n"}
          We use administrative, technical, and physical safeguards to protect your information. However, no system is completely secure, and we cannot guarantee the absolute security of your information.{"\n\n"}

          5. Your Rights and Choices{"\n"}
          - You may access, update, or delete your account information at any time.{"\n"}
          - You may opt-out of marketing emails or notifications.{"\n"}
          - Depending on your jurisdiction, you may have additional privacy rights (e.g., GDPR, CCPA).{"\n\n"}

          6. Children's Privacy{"\n"}
          Our app is not intended for children under the age of 13 (or equivalent minimum age in your jurisdiction). We do not knowingly collect personal information from children.{"\n\n"}

          7. Changes to This Privacy Policy{"\n"}
          We may update this Privacy Policy from time to time. If we make significant changes, we will notify you by posting a notice in the app or sending an email.{"\n\n"}

          8. Contact Us{"\n"}
          If you have any questions about this Privacy Policy or our data practices, please contact us at:{"\n"}
          Email: support@example.com{"\n\n"}

          By using our app, you agree to the collection and use of information in accordance with this policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})