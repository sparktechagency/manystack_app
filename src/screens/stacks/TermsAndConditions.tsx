import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={{flex: 1, padding: 16}}>
      <ScrollView>
        <Text>
          Terms and Conditions{'\n\n'}
          Last updated: May 27, 2025{'\n\n'}
          Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using our application ("the App",
          "Service"). By accessing or using the App, you agree to be bound by
          these Terms.{'\n\n'}
          1. Use of the App{'\n'}- You must be at least 13 years old to use this
          app.{'\n'}- You agree to use the App only for lawful purposes.{'\n'}-
          You are responsible for maintaining the confidentiality of your
          account and password.{'\n\n'}
          2. User Accounts{'\n'}- When you create an account, you must provide
          accurate and complete information.{'\n'}- You are solely responsible
          for the activity that occurs on your account.{'\n'}- We reserve the
          right to suspend or terminate accounts that violate these Terms.
          {'\n\n'}
          3. Content{'\n'}- You retain ownership of any content you submit,
          post, or display on or through the App.{'\n'}- By submitting content,
          you grant us a non-exclusive, worldwide, royalty-free license to use,
          modify, display, and distribute such content within the app.{'\n'}- We
          reserve the right to remove any content that we consider inappropriate
          or violates any law or these Terms.{'\n\n'}
          4. Intellectual Property{'\n'}- The App and its original content,
          features, and functionality are and will remain the exclusive property
          of the app developers.{'\n'}- You may not copy, modify, distribute, or
          create derivative works of our content without our written permission.
          {'\n\n'}
          5. Prohibited Activities{'\n'}- You may not use the app for any
          illegal or unauthorized purpose.{'\n'}- You may not interfere with the
          operation of the app or access its systems using automated means.
          {'\n'}- You may not collect personal information of other users
          without their consent.{'\n\n'}
          6. Termination{'\n'}- We may suspend or terminate access to our App
          immediately, without prior notice or liability, for any reason
          whatsoever, including if you breach the Terms.{'\n'}- Upon
          termination, your right to use the App will cease immediately.{'\n\n'}
          7. Limitation of Liability{'\n'}- The App is provided on an "AS IS"
          and "AS AVAILABLE" basis.{'\n'}- We do not guarantee the App will be
          available, uninterrupted, secure, or error-free.{'\n'}- In no event
          shall we be liable for any indirect, incidental, special,
          consequential or punitive damages.{'\n\n'}
          8. Changes to Terms{'\n'}- We reserve the right to modify or replace
          these Terms at any time.{'\n'}- It is your responsibility to check the
          Terms periodically. Continued use of the App after changes means you
          accept the new Terms.{'\n\n'}
          9. Governing Law{'\n'}- These Terms shall be governed and construed in
          accordance with the laws of your country or state.{'\n\n'}
          10. Contact Us{'\n'}- If you have any questions about these Terms,
          please contact us at:{'\n'}
          Email: support@example.com{'\n\n'}
          By using the App, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
