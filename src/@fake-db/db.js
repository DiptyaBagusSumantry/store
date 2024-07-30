import mock from './mock'

/* eslint-disable import/extensions */

// JWT
import './jwt'

/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
