export const FORM_TYPES = {
  page: 'page',
  modal: 'modal',
}

export const ACTIONS_TYPE = [
  {
    label: 'Submit',
    value: '$form.submit[]',
  },
  {
    label: 'Cancel',
    value: '$form.cancel[]',
  },
  {
    label: 'Delete',
    value: '$form.remove[]',
  },
  {
    label: 'Login',
    value: '$form.login[]',
  },
  {
    label: 'Logout',
    value: '$form.logout[]',
  },
]

const link = {
  label: 'Go to link',
  value: '$route.history.push[$arg_1_2_0]',
  args: {
    $arg_1_2_0: 'Link',
  },
}

const message = {
  label: 'Show message',
  value: '$page.showInfoMessage[$arg_1_1_0,$arg_1_1_1]',
  args: {
    $arg_1_1_0: 'Message',
  },
}

export const AFTER_ACTIONS = {
  '$form.login[]': [link],
  '$form.logout[]': [link],
  '$form.submit[]': [link, message],
  '$form.cancel[]': [link, message],
  '$form.remove[]': [link, message],
}
