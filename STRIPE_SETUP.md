# Stripe Payment Link Setup Guide

## Step 1: Create a Product in Stripe Dashboard

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Products** in the left sidebar
3. Click **+ Add product**
4. Fill in the details:
   - **Name**: Automation Partner Plan
   - **Description**: Monthly subscription for automation services ($500/month, includes 5 hours of dedicated automation work)
   - **Pricing**: 
     - Select **Recurring**
     - Set price to **$500.00 USD**
     - Billing period: **Monthly**
   - Click **Save product**

## Step 2: Create a Payment Link

1. In Stripe Dashboard, go to **Products** > **Payment Links** (or use the quick link in the sidebar)
2. Click **+ Create payment link**
3. Select the **Automation Partner Plan** product you just created
4. Configure the payment link:
   - **Customer information**: Enable email (required) and optionally phone/address
   - **After payment**: You can set up a success page URL or use Stripe's default
   - **Subscription settings**: Make sure it's set to recurring monthly
5. Click **Create payment link**
6. Copy the Payment Link URL (it will look like: `https://buy.stripe.com/xxxxx`)

## Step 3: Add Payment Link to Your Website

1. Open `script.js` in your project
2. Find the line that says: `const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE';`
3. Replace `https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE` with your actual Payment Link URL
4. Save the file

## Step 4: Test Your Integration

1. Use Stripe's **Test Mode** first to test the checkout flow
2. Use test card: `4242 4242 4242 4242` with any future expiry date and CVC
3. Once everything works, switch to **Live Mode** in your Stripe Dashboard
4. Update the Payment Link URL in `script.js` if needed (test and live links are different)

## Important Notes

- **Test vs Live Mode**: Make sure you're using the correct Payment Link URL for your environment
- **Recurring Subscriptions**: The Payment Link will automatically handle recurring monthly charges
- **Customer Portal**: Stripe automatically provides a customer portal where subscribers can manage their subscriptions
- **Webhooks** (Optional): If you want to track subscription events (new subscriptions, cancellations, etc.), set up webhooks in your Stripe Dashboard

## Need Help?

- [Stripe Payment Links Documentation](https://stripe.com/docs/payment-links)
- [Stripe Subscriptions Guide](https://stripe.com/docs/billing/subscriptions/overview)

