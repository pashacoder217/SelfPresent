const sendEmail = async (email: string | undefined, name: string | undefined) => {
  try {
    const response = await fetch(
      `${process.env.LOOPS_API_URL}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "transactionalId": "clwz3c7e800kcqeg8cvdss2ie",
          "email": `${email}`,
          "dataVariables": {
            "user_name": `${email}`
          }
        })
      }
    )
  } catch (err) {
    console.log(err);
  }
}

export default sendEmail;
