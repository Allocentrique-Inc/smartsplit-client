// Source : module semantic-ui-react-formik (retiré, voir npm)
Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var formik = require('formik');
var semanticUiReact = require('semantic-ui-react');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function isObject(obj) {
    return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object';
}

function getFormikFieldError(form, fieldName) {
    var _ref = form.status || {},
        serverValidation = _ref.serverValidation;

    var touched = formik.getIn(form.touched, fieldName);
    var error = formik.getIn(form.errors, fieldName);
    var checkTouched = serverValidation ? !touched : touched;
    return checkTouched && error;
}
function setFormikFieldValue(form, name, value, shouldValidate) {
    form.setFieldValue(name, value, shouldValidate);
    form.setFieldTouched(name, true, shouldValidate);
}
function appendObjectErrors(object, parentField, form, result) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var val = object[key];

            var fieldName = parentField ? Array.isArray(object) ? parentField + '[' + key + ']' : parentField + '.' + key : key;

            if (isObject(val)) {
                appendObjectErrors(val, fieldName, form, result);
            } else {
                var error = getFormikFieldError(form, fieldName);
                if (error) {
                    result.push(error);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function getFormikErrors(form) {
    var errors = form.errors;

    var result = [];
    appendObjectErrors(errors, undefined, form, result);
    return result;
}
function appendErrorsToTouched(result, errors) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(errors)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            var val = errors[key];
            if (isObject(val)) {
                result[key] = Array.isArray(val) ? [] : {};
                appendErrorsToTouched(result[key], val);
            } else {
                result[key] = true;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}

function touchedOrHasErrorState(touched, errors) {
    var result = {};
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = Object.keys(touched)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var k = _step3.value;

            result[k] = touched[k];
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    appendErrorsToTouched(result, errors);
    return result;
}

function isSemanticUiReactFormControl(component) {
    return component === semanticUiReact.Form.Button || component === semanticUiReact.Form.Checkbox || component === semanticUiReact.Form.Dropdown || component === semanticUiReact.Form.Group || component === semanticUiReact.Form.Input || component === semanticUiReact.Form.Radio || component === semanticUiReact.Form.Select || component === semanticUiReact.Form.TextArea;
}

function isSemanticUiReactFormRadio(component) {
    return component === semanticUiReact.Radio || component === semanticUiReact.Form.Radio;
}

var Wizard = function (_React$Component) {
    inherits(Wizard, _React$Component);

    function Wizard(props) {
        classCallCheck(this, Wizard);

        var _this = possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            page: 0,
            values: props.initialValues,
            pochette: props.pochette
        };
        return _this;
    }

    createClass(Wizard, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                buttonLabels = _props.buttonLabels,
                errorsHeader = _props.errorsHeader,
                disableSubmitOnError = _props.disableSubmitOnError,
                children = _props.children,
                debug = _props.debug;
            var _props2 = this.props,
                validateOnChange = _props2.validateOnChange,
                validateOnBlur = _props2.validateOnBlur;

            if (validateOnChange === undefined) {
                validateOnChange = true;
            }
            if (validateOnBlur === undefined) {
                validateOnBlur = false;
            }
            var _state = this.state,
                page = _state.page,
                values = _state.values;

            var activePage = React.Children.toArray(children)[page];
            var isLastPage = page === React.Children.count(children) - 1;
            var _activePage$props = activePage.props,
                showSubmit = _activePage$props.showSubmit,
                showPrevious = _activePage$props.showPrevious;

            showSubmit = showSubmit === undefined || showSubmit;
            showPrevious = showPrevious === undefined || showPrevious;
            var activePageButtonLabels = activePage.props.buttonLabels;
            var submitLabel = 'Submit';
            var nextLabel = 'Next';
            var previousLabel = 'Previous';
            if (activePageButtonLabels && activePageButtonLabels.submit) {
                submitLabel = activePageButtonLabels.submit;
            } else if (buttonLabels && buttonLabels.submit) {
                submitLabel = buttonLabels.submit;
            }
            if (activePageButtonLabels && activePageButtonLabels.next) {
                nextLabel = activePageButtonLabels.next;
            } else if (buttonLabels && buttonLabels.next) {
                nextLabel = buttonLabels.next;
            }
            if (activePageButtonLabels && activePageButtonLabels.previous) {
                previousLabel = activePageButtonLabels.previous;
            } else if (buttonLabels && buttonLabels.previous) {
                previousLabel = buttonLabels.previous;
            }

            var ButtonsWrapper = this.props.ButtonsWrapper;


            return React.createElement(formik.Formik, {
                initialValues: values,
                enableReinitialize: false,
                validateOnChange: validateOnChange,
                validateOnBlur: validateOnBlur,
                validate: this.validate,
                onSubmit: this.handleSubmit,
                render: function render(props) {
                    var errors = getFormikErrors(props);
                    var hasErrors = errors.length > 0;
                    var disableNext = hasErrors && disableSubmitOnError;
                    var disableSubmit = disableNext || props.isSubmitting;

                    var buttons = function buttons() {
                        return React.createElement(
                            semanticUiReact.Form.Group,
                            { className: "wizard-buttons", style: { display: 'block', overflow: 'hidden' } },
                            React.createElement(
                                "div",
                                { className: "ui grid" },
                                React.createElement(
                                    "div",
                                    { className: "ui row" },
                                    React.createElement("div", { className: "four wide column" }),
                                    React.createElement(
                                        "div",
                                        { className: "ten wide column" },
                                        showSubmit && isLastPage && React.createElement(
                                            semanticUiReact.Button,
                                            { className: _this2.state.pochette ? 'pochette' : '', type: "submit", floated: "right", primary: true, disabled: disableSubmit },
                                            submitLabel
                                        ),
                                        showSubmit && !isLastPage && React.createElement(
                                            semanticUiReact.Button,
                                            { className: _this2.state.pochette ? 'pochette' : '', floated: "right", onClick: function onClick(e) {
                                                    return _this2.next(e, props);
                                                }, primary: true, disabled: disableNext },
                                            nextLabel
                                        ),
                                        showPrevious && page > 0 && React.createElement(
                                            semanticUiReact.Button,
                                            { className: "negative " + (_this2.state.pochette ? 'pochette' : ''),
                                                style: {
                                                    border: "1px solid #DCDFE1",
                                                    bordeRadius: "3px",
                                                    color: _this2.state.pochette ? "#F2724A" : "#2DA84F"
                                                },
                                                floated: "left", onClick: function onClick(e) {
                                                    return _this2.previous(e, props);
                                                }, negative: true },
                                            previousLabel
                                        )
                                    )
                                )
                            )
                        );
                    };

                    return React.createElement(
                        semanticUiReact.Form,
                        { onSubmit: props.handleSubmit },
                        React.cloneElement(activePage, {
                            parentState: _extends({}, props, {
                                previous: function previous(e) {
                                    return _this2.previous(e, props);
                                },
                                next: function next(e) {
                                    return _this2.next(e, props);
                                }
                            })
                        }),
                        ButtonsWrapper ? React.createElement(
                            ButtonsWrapper,
                            null,
                            buttons()
                        ) : buttons(),
                        errorsHeader && hasErrors && React.createElement(semanticUiReact.Message, {
                            negative: true,
                            header: errorsHeader,
                            list: errors.map(function (e, i) {
                                return { key: i, content: e };
                            })
                        }),
                        debug && React.createElement(
                            "pre",
                            null,
                            JSON.stringify(props.values, null, 2)
                        )
                    );
                }
            });
        }
    }]);
    return Wizard;
}(React.Component);

Wizard.Page = function (_ref2) {
    var children = _ref2.children,
        parentState = _ref2.parentState;

    return React.cloneElement(children, parentState);
};

Wizard.Field = function (_ref3) {
    var component = _ref3.component,
        _ref3$componentProps = _ref3.componentProps,
        componentProps = _ref3$componentProps === undefined ? {} : _ref3$componentProps,
        fieldProps = objectWithoutProperties(_ref3, ["component", "componentProps"]);
    return React.createElement(formik.Field, _extends({}, fieldProps, {
        render: function render(renderProps) {
            var id = componentProps.id;
            var field = renderProps.field,
                form = renderProps.form;
            var name = field.name,
                value = field.value;


            if (!id) {
                id = "wizard_field_" + name;
            }

            var error = getFormikFieldError(form, name);

            var props = _extends({}, componentProps, field, renderProps, {
                id: id
            });

            if (isSemanticUiReactFormControl(component)) {
                props.error = !!error;
            } else {
                props.error = error;
            }

            if (isSemanticUiReactFormRadio(component)) {
                props.value = componentProps.value;
                props.checked = value === componentProps.value;
                props.onChange = field.onChange;
                props.onBlur = field.onBlur;
            } else {
                props.value = value || "";
                props.onChange = function (e, _ref4) {
                    var name = _ref4.name,
                        value = _ref4.value;

                    setFormikFieldValue(form, name, value, true);
                };
                props.onBlur = form.handleBlur;
            }

            return React.createElement(component, props);
        }
    }));
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.componentDidUpdate = function (_prevProps, prevState) {
        var page = _this3.state.page;

        if (page !== prevState.page) {
            var onPageChanged = _this3.props.onPageChanged;

            if (onPageChanged) {
                onPageChanged(page);
            }
        }
    };

    this.next = function (e, formikBag) {
        e.preventDefault();

        var values = formikBag.values,
            touched = formikBag.touched,
            validateForm = formikBag.validateForm,
            setErrors = formikBag.setErrors,
            setTouched = formikBag.setTouched;


        validateForm(values).then(function (errors) {
            var forcedTouched = touchedOrHasErrorState(touched, errors);

            setErrors(errors);
            setTouched(forcedTouched);

            var isValid = Object.keys(errors).length === 0;
            if (isValid) {
                _this3.setState(function (state) {
                    return {
                        page: Math.min(state.page + 1, _this3.props.children.length - 1)
                    };
                });
            }
        });
    };

    this.previous = function (e, _ref5) {
        var setErrors = _ref5.setErrors;

        e.preventDefault();
        _this3.setState(function (state) {
            return {
                page: Math.max(state.page - 1, 0)
            };
        }, function () {
            setErrors([]);
        });
    };

    this.validate = function (values) {
        var activePage = React.Children.toArray(_this3.props.children)[_this3.state.page];
        var result = activePage.props.validate ? activePage.props.validate(values) : {};
        return result;
    };

    this.handleSubmit = function (values, bag) {
        var onSubmit = _this3.props.onSubmit;

        return onSubmit(values, bag);
    };
};

exports.Wizard = Wizard;