/**
 * A helper function to help rewrite in a clearer fashion the mixin style class inheritance
 *
 * MIXIN CLASSES
 * ------------------------------------------------------------------------------------------------
 *
 * Mixin classes are classes whose extend statement exploits JavaScript's ES6 extend declaration
 * where the statement `class [classname] extends _extend_expression_` can be written where
 * _extend_expression_ can be a function that is executed when the class is instantiated,
 * as long as the _extend_expression_ returns a class (which in ES5 is transpiled to a constructor)
 *
 * Mixin classes (unlike some forms of JS multiple inheritance) support the use of
 *  - `super()` called from the constructor of the Mixin
 *  - `super.property` (getters & setters) and `super.method()` which can be called
 *    from the overridden properties and functions
 *
 * Mixin classes used with Model must follow the rule that their properties and methods
 * must not depend on other mixins, nor the order of how these mixins are instantiated
 * for example:
 *
 *     class D extends F(G(Base)) {}
 *
 *     class E extends G(F(Base)) {}
 *
 *     let d,e;
 *     d = new D()
 *     e = new E()
 *
 * `d` and `e` are functionally equivalent, even though d and e are not the same classes
 *
 * Mixin classes should carefully avoid namespace collision of properties and methods so that
 * to ensure independence and make compositional inheritance independent of order
 *
 * IMPROVED READABILITY USING `WithMixins`
 * --------------------------------------------------------------------------------------------------
 *
 * the class statement
 *
 *     class A extends mixin1(mixin2(mixin3(mixin4(Base))))
 *
 * can be written as
 *
 *     class A extends WithMixins(mixin1, mixin2, mixin3, mixin4)(Base){
 *
 *
 * `WithMixins` is analogous to `compose(f,g,h)` which becomes `f(g(h))` the main difference
 * is that WithMixin returns a function which takes the BaseClass that all other mixins add
 * their prototypes to. this is equivalent to an implementation of compose that would look
 * like`compose(f,g)(h)`
 *
 * USAGE AS A DECORATOR
 * ---------------------------------------------------------------------------------------------------
 * `WithMixins` can be used as a decorator but it's inheritance structure is different
 * and it does not really improve readability all that much
 *
 *  example:
 *
 *      class A extends WithMixins(f,g)(Base){
 *
 *      }
 *
 *
 *      @WithMixins(f,g)
 *      class B extends Base {
 *
 *      }
 *
 * classes A and B are not equivalent in their inheritance structures, because the constructors are not
 * run in the same order.
 *
 * class A will run the prototype constructors in the following order: Base, g, f, A
 * class B will run the prototype constructors in the following order: Base, B, g, f,
 *
 * if the mixins and subclasses are properly written to be independent of each
 * other this should not really matter, because the root constructor is still Base.
 *
 * However the main caveat will be the classes' constructor name. if the code tests for
 * the `constructor.name` to make sure an object is of the correct "type". the results
 * will not be the same. an instance of A will pass, but an instance of B will not.
 *
 * For example:
 *
 *     let a = new A(), b = new B();
 *
 *     if(a.constructor.name =="A")
 *       console.log('a is of type A')
 *     else
 *       console.log('a is NOT of type A', it is of type '+b.constructor.name)
 *
 *     if(b.constructor.name =="B")
 *       console.log('b is of type B')
 *     else
 *       console.log('b is NOT of type B, it is of type '+b.constructor.name)
 *
 * the output will be
 *
 *       a IS of type A
 *       b is NOT of type B, it is of type _class
 *
 *
 * @see MixinTest
 *
 *
 *
 * @return {extender}
 * @constructor
 */
export default function WithMixins() {
	// the variable number of arguments we reverse
	// and define an array called 'mixins'
	let mixins = [...arguments].reverse()

	/**
	 * we then return a function with the innermost base class as the single argument
	 * this function will reduce the mixins array to a single class
	 * by sequentially inheriting each mixin in turn
	 *
	 * @param InnermostBaseClass {*} the very base class to inherit from
	 * @return {*} the final result of our mixin inheritance chain
	 */
	let extender = (InnermostBaseClass) =>
		mixins.reduce(
			// each mixin must be a function that returns an extended class
			(accumulator, mixin) => mixin(accumulator),
			InnermostBaseClass
		)

	return extender
}

/**
 * this is just a demo test method to show the different inheritance structures
 * that occur when using `WithMixins` as a class extends statement versus being
 * used as a decorator
 *
 */
export function MixinTest() {
	const f = (base) =>
		class extends base {
			constructor() {
				super()
				this.prototypeOrder.push("f")
			}
		}

	const g = (base) =>
		class extends base {
			constructor() {
				super()
				this.prototypeOrder.push("g")
			}
		}

	class Base {
		prototypeOrder = []
		constructor() {
			this.prototypeOrder.push("Base")
		}
	}

	class A extends WithMixins(f, g)(Base) {
		constructor() {
			super()
			this.prototypeOrder.push("A")
		}
	}

	@WithMixins(f, g)
	class B extends Base {
		constructor() {
			super()
			this.prototypeOrder.push("B")
		}
	}

	let a = new A(),
		b = new B()
	console.log("WithMixin inheritance test")
	console.log(a.prototypeOrder.join(" <- ") + " : name = " + a.constructor.name)
	console.log(b.prototypeOrder.join(" <- ") + " : name = " + b.constructor.name)
	if (a.constructor.name === "A") console.log("a IS of type A")
	else console.log("a is NOT of type A, it is of type " + b.constructor.name)

	if (b.constructor.name === "B") console.log("b IS of type B")
	else console.log("b is NOT of type B, it is of type " + b.constructor.name)
}
