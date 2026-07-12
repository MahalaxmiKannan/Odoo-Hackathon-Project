import Button from "./Button";

const Card = ({ onClick }) => {

    return (

        <div className="border rounded-lg p-4 mt-6">

            <h3 className="text-xl font-semibold">
                New here?
            </h3>

            <p className="text-gray-600 mt-2">
                Sign up creates an employee account.
                Admin roles are assigned later.
            </p>

            <Button
                text="Create Account"
                type="button"
                onClick={onClick}
            />

        </div>

    );

};

export default Card;