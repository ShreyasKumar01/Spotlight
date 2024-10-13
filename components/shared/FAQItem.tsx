import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQParams } from '@/types'

const parkingFAQs = [
  {
    question: "How do I reserve a parking spot?",
    answer: "You can reserve a parking spot through our mobile app or website. Simply select your desired location, date, and time, then follow the prompts to complete your reservation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, PayPal, and mobile payment solutions like Apple Pay and Google Pay. Cash payments are also accepted at select locations."
  },
  {
    question: "Can I extend my parking duration?",
    answer: "Yes, you can extend your parking duration through our app or by using the pay station at the parking location. Please note that extensions are subject to availability and local regulations."
  },
  {
    question: "What happens if I overstay my booked time?",
    answer: "If you overstay your booked time, additional charges may apply. These charges are calculated in hourly increments based on the current parking rate. We recommend extending your booking if you need more time."
  },
  {
    question: "Is there a refund policy for cancellations?",
    answer: "Yes, we offer full refunds for cancellations made at least 24 hours before the scheduled parking time. For cancellations made within 24 hours, a partial refund may be available depending on the specific location and circumstances."
  },
  {
    question: "How do I report an issue with my parking experience?",
    answer: "You can report issues through our mobile app, website, or by calling our customer support hotline. Please provide details such as your booking number, location, and the nature of the issue for prompt assistance."
  }
];

const FAQItem = () => {
  return (
    <>
        <h2 className="h2-bold flex justify-center mt-3">
          Frequently asked Questions
        </h2>
        <Accordion type="single" collapsible>
          {parkingFAQs.map((faq: FAQParams, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </>
  )
}

export default FAQItem