// id lookup
const _ids = {};

const partsMixin = (SuperClass) => class PartsMixin extends SuperClass {
  constructor(options) {
    super(options);

    this.hasPart = null;
    this.isPartOf = null;
  }
};


class Base {
  constructor(options) {
    const {
      ID,
      date,
      title,
      description
    } = options;

    this.name = this.constructor.name;

    this.ID = ID || createID(this.name);
    this.date = date ? date : createDate();
    this.title = title || '';
    this.description = description || '';
  }
}



export class TestSubject extends partsMixin(Base) {
  constructor(options) {
    super(options);

    const { type } = options;
    const ALLOWED_TYPES = [
      'WebSite',
      'WebPage'
    ];

    this.type = ['TestSubject'];

    if (ALLOWED_TYPES.indexOf(type) >= 0) {
      this.type.push(type);
    }
  }
}


class TestCriterion extends partsMixin(Base) {
  constructor(options) {
    super(options);

    this.type = ['TestCriterion'];
  }
}



export class TestRequirement extends TestCriterion {
  constructor(options) {
    super(options);

    this.type = this.type.concat(['TestRequirement']);
  }
}

function createDate(date = new Date()) {
  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();

  return `${Y}-${M}-${D}`;
}

function createID(className) {
  let currentIds = _ids[className];
  let newId;

  if (!currentIds) {
    currentIds = _ids[className] = [];
  }

  newId = currentIds.length > 0
    ? Math.max.apply(null, currentIds) + 1
    : 1;

  currentIds.push(newId);

  return newId;
}
