import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
  } from "@radix-ui/react-icons"

  import { ShoppingBasket } from 'lucide-react';
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: QuestionMarkCircledIcon,
    },
    {
      value: "todo",
      label: "Todo",
      icon: CircleIcon,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: StopwatchIcon,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircledIcon,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: CrossCircledIcon,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownIcon,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightIcon,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpIcon,
    },
  ]

  export const categories = [
    {
        label: 'Grocery',
        value: 'grocery',
        icon: ShoppingBasket
    },
    {
        label: 'Utility',
        value: 'utility',
    },
    {
        label: 'Amazon',
        value: 'amazon',
    },
    {
        label: 'Renovation',
        value: 'renovation',
    },
    {
        label: 'Restaurant',
        value: 'restaurant',
    },
    {
        label: 'Gift',
        value: 'gift',
    },
    {
        label: 'Gas',
        value: 'gas',
    },
    {
        label: 'Health',
        value: 'health',
    },
    {
        label: 'Misc',
        value: 'misc',
    },
    {
        label: 'Other',
        value: 'other',
    }
  ]

  export const banks = [
    {
        bank: 'Bank of America',
        bankValue: 'bofa'
    },
    {
        bank: 'Citi',
        bankValue: 'citi'
    },
    {
        bank: 'Wells Fargo',
        bankValue: 'wf'
    },
    {
        bank: 'Chase',
        bankValue: 'chase'
    },
  ]