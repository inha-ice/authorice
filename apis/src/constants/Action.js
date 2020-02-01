const Action = {
  CREATE_USER() {
    return 'CREATE_USER: actor=self';
  },
  DELETE_USER() {
    return 'DELETE_USER: actor=self';
  },
  DELETE_USER_BY(actor) {
    return `DELETE_USER: actor=${actor}`;
  },
  LOGIN() {
    return 'LOGIN: actor=self';
  },
  READ_USER() {
    return 'READ_USER: actor=self';
  },
  READ_USER_BY(actor) {
    return `READ_USER: actor=${actor}`;
  },
  READ_USER_LOG() {
    return 'READ_USER_LOG: actor=self';
  },
  READ_USER_LOG_BY(actor) {
    return `READ_USER_LOG: actor=${actor}`;
  },
  READ_USER_PRIVACY() {
    return 'CREATE_USER: actor=self';
  },
  READ_USER_PRIVACY_BY(actor) {
    return `CREATE_USER: actor=${actor}`;
  },
  RESET_USER_PASSWORD_BY(actor) {
    return `RESET_USER_PASSWORD_BY: actor=${actor}`;
  },
  UPDATE_USER(fieldNames) {
    return `UPDATE_USER: actor=self; fields=${fieldNames.join(',')}`;
  },
  UPDATE_USER_LEVEL_BY(actor, level) {
    return `UPDATE_USER_LEVEL_BY: actor=${actor}; level=${level}`;
  },
  UPDATE_USER_PRIVACY(fieldNames) {
    return `UPDATE_USER_PRIVACY: actor=self; fields=${fieldNames.join(',')}`;
  },
};

module.exports = Action;
