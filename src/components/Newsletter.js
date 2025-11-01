import { useState, useEffect } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'success') clearFields();
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email
    })
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <div className="col-span-2 mb-8">
      <div className="bg-dark-bg rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Subscribe to our Newsletter<br />& Never miss latest updates
            </h3>
            {status === 'sending' && <p className="text-white/70">Sending...</p>}
            {status === 'error' && <p className="text-red-500">{message}</p>}
            {status === 'success' && <p className="text-green-500">{message}</p>}
          </div>
          <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-dark-secondary border-white/10 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:scale-105 transition-transform"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
