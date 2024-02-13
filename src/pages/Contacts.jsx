import HomeLayout from "../layouts/HomeLayout";

function Contacts() {

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form className="flex flex-col justify-center items-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]" >
                    <h1 className="text-3xl font-semibold">
                        Contact Us
                    </h1>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="text-xl font-bold">
                            Name
                        </label>
                        <input
                            className="bg-transparent font-semibold border rounded-sm px-2 py-1"
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Your name"
                            // value={true}
                        />


                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="text-xl font-bold">
                            Email
                        </label>
                        <input
                            className="bg-transparent font-semibold border rounded-sm px-2 py-1"
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your email"
                        />


                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="text-xl font-bold">
                            Your message
                        </label>
                        <textarea
                            className="bg-transparent font-semibold border rounded-sm px-2 py-1 h-40 resize-none"
                            required
                            type="message"
                            name="message"
                            id="message"
                            placeholder="type here.."

                        >

                        </textarea>

                    </div>

                </form>
            </div>

        </HomeLayout>

    )



}

export default Contacts;